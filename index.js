const {
  isMainThread,
  Worker,
  parentPort,
  workerData,
} = require("worker_threads");
const { GoogleFormService } = require("./src/services/GoogleFormService");
require("dotenv").config();

if (isMainThread) {
  // Main thread: Distribute work across multiple threads
  const numThreads = process.env.THREADS || 1; // Adjust based on your system's cores
  const tasks = Array.from({ length: numThreads }, (_, i) => i); // Dummy task data

  for (const task of tasks) {
    const worker = new Worker(__filename, { workerData: task });
    worker.on("message", (msg) => console.log(`Worker ${task}:`, msg));
    worker.on("error", (err) => console.error(`Worker ${task} Error:`, err));
    worker.on("exit", (code) => {
      if (code !== 0) console.error(`Worker ${task} exited with code ${code}`);
    });
  }
} else {
  (async () => {
    // Configuration variables
    const formLink = "<your Google form link here>";
    const filePath = "<The absolute path of your configuration.json file here>";

    // Google form service
    const googleFormService = new GoogleFormService(formLink, filePath);
    await googleFormService.prepareNavigator();

    // Start the form filling process
    for (let i = 0; i < googleFormService.getIterations(); i++) {
      await googleFormService.formFillingProcessor();
    }
    await googleFormService.closeNavigator();

    parentPort.postMessage(`Worker ${workerData}: Task Complete`);
    await console.log(
      `[][][][][][][][]:        Worker ${workerData}: Task Complete`
    );
  })();
}
