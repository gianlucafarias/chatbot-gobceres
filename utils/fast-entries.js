const messageQueue = [];

const MESSAGE_GAP_SECONDS = 3000;

let messageTimer = null;

/**
 * Adds a message to the queue for later processing.
 * @param {string} messageText - The text of the message to add to the queue.
 * @returns {Promise<void>} - A promise that resolves when the message queue is processed.
 */
async function enqueueMessage(messageText) {
  messageQueue.push({ text: messageText, timestamp: Date.now() });

  return new Promise((resolve) => {
    if (messageTimer) {
      clearTimeout(messageTimer);
    }

    messageTimer = setTimeout(() => {
      resolve(processMessageQueue());
    }, MESSAGE_GAP_SECONDS);
  });
}

/**
 * Processes the message queue by combining all messages into a single string and clearing the queue.
 * @returns {string} - The combined string of all messages in the queue.
 */
function processMessageQueue() {
  if (messageQueue.length === 0) {
    return '';
  }

  const combinedMessage = messageQueue.map((message) => message.text).join(' ');
  messageQueue.length = 0;
  return combinedMessage;
}

module.exports = { enqueueMessage, processMessageQueue };