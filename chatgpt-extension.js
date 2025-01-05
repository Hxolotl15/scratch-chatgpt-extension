class AIBlock {
    getInfo() {
        // Metadata for block
        return {
            "id": "ChatGPT",  // Changed ID to ChatGPT
            "name": "ChatGPT",  // Changed name to ChatGPT
            "blocks": [{
                "opcode": "completePrompt",
                "blockType": "reporter",
                "text": "complete prompt [string]",
                "arguments": {
                    "string": {
                        "type": "string",
                        "defaultValue": "Explain quantum computing in simple terms"
                    }
                },
                "iconURI": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAAD8K25oAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjQuMywgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy/MGXBkAAAACXBIWXMAAB7CAAAewgFu0HU+AAABGElEQVRIDbXBAQEAAAABIP6PzgpVwEEbsxVYmUtKkLkXYmVr0EdtGm8bfTdsV6dXyZyzVYFpYoZ8fgcqaNmOfFgTo3ZJdFoy3yU06t8yGFYyZG1RmIh7hhHj0Fi59mOSgnn5dVtD5x8gYg6K81AWvL1A2ERZKzNwoQ7VgHj7J2dySuxdmWizdLqCsgT0W36cS7usQ6A4JvbcujiZ1NlA7GVW+eXP/ctFwg0hF5gAf0b0qsf2B11RU8kYW2fDWtchhDmwNVaqtk7syr02jGrgAAAAASUVORK5CYII=",  // ChatGPT icon (base64 encoded)
                "color": "#00b140"  // Green color (same as my shade)
            }],
            "menus": {}
        };
    }

    async completePrompt({ string }) {
        // Remove trailing spaces, required for model to work properly
        const text = string.trim();

        // Request text completion using Davinci3
        const url = `https://api.openai.com/v1/completions`;  // Correct endpoint

        const options = {
            method: "POST",
            body: JSON.stringify({
                model: "text-davinci-003",  // Using Davinci 003
                prompt: text,
                max_tokens: 300,
                temperature: 0.7,
            }),
            headers: {
                Authorization: `Bearer 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`,  // Your API Key (replace with yours if needed)
                "Content-type": "application/json; charset=UTF-8"
            },
        };

        console.log("REQUEST: " + url);

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const jsonData = await response.json();

            const output = jsonData.choices[0].text.trim();  // Trim output

            return output;

        } catch (error) {
            console.error('Error during API request:', error);
            return 'Error: Could not retrieve AI response.';
        }
    }
}

// Register block with Scratch
Scratch.extensions.register(new AIBlock());
