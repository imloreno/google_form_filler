# Google form solver 🔥

Based on a JSON configuration file file, filling a google form automatically, running tasks in parallel

## Setting up

```bash
# Install libraries
$ pnpm install
```

After running the installation command, ensure the variables of .env file correspond with your system specification

```bash
PWDEBUG=                # Set 1 in case you wanna see the inspector when opening browsers
THREADS=17              # Set the threads to run many tasks in parallel
ENVIRONMENT=dev         # In case you wanna debug the navigator
```

You need to configure the JSON file as per your questions

```json
{
  "loop": 10, // The number of iterations per thread
  "pages": [
    // If the form contains more than 1 page, separate them into pages
    [
      {
        "label": "Pregunta 1", // Label of the question
        "type": "radio", // Type of question
        "options": [
          // All possible options
          {
            "identifier": "div#i6.Od2TWd.hYsg7c", // Playwright identifier
            "odds": [
              // Probability of occurrence
              0, 90
            ]
          },
          {
            "identifier": "div#i9.Od2TWd.hYsg7c",
            "odds": [91, 100]
          }
        ]
      },
      {
        "label": "Pregunta 2",
        "type": "text", // Type of question
        "identifier": "input[aria-labelledby='i15 i18']", // For type text, the identifier must be here
        "options": [
          {
            "odds": [
              // Probability of occurrence
              0, 50
            ],
            "labels": [
              // The algorithm will take one of these randomly
              "Texto de prueba 1 - (probabilidad = 50%)",
              "Texto de prueba 2 - (probabilidad = 50%)",
              "Texto de prueba 3 - (probabilidad = 50%)",
              "Texto de prueba 4 - (probabilidad = 50%)",
              "Texto de prueba 5 - (probabilidad = 50%)"
            ]
          },
          {
            "odds": [51, 100],
            "labels": [
              // In case the text is just 1, create the text and wrap it inside an array
              "Test text 1 - (probability = 50%)"
            ]
          }
        ]
      }
    ], // Pages division
    [
      {
        "label": "Pregunta 4",
        "type": "text",
        "identifier": "input[aria-labelledby='i15 i18']",
        "options": [
          {
            "odds": [0, 30],
            "labels": [
              "Texto de prueba 1 - (probability = 30%)",
              "Texto de prueba 2 - (probability = 30%)",
              "Texto de prueba 3 - (probability = 30%)",
              "Texto de prueba 4 - (probability = 30%)",
              "Texto de prueba 5 - (probability = 30%)"
            ]
          },
          {
            "odds": [31, 100],
            "labels": [
              "Test text 1 - (probability = 70%)",
              "Test text 2 - (probability = 70%)",
              "Test text 3 - (probability = 70%)",
              "Test text 4 - (probability = 70%)",
              "Test text 5 - (probability = 70%)"
            ]
          }
        ]
      },
      {
        "label": "Pregunta 5",
        "type": "radio",
        "options": [
          {
            "identifier": "div#i25.Od2TWd.hYsg7c",
            "odds": [0, 20]
          },
          {
            "identifier": "div#i28.Od2TWd.hYsg7c",
            "odds": [21, 100]
          }
        ]
      }
    ]
  ]
}
```

After that, in the index.js file, set the variables formLink & filePath

```javascript
// Configuration variables
const formLink = "<your Google form link here>";
const filePath = "<The absolute path of your configuration.json file here>";
```

Running the application

```bash
# Run the application
$ pnpm start
```

That's it, enjoy it 😁🚀
