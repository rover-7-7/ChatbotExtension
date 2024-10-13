const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

const generateResponse = (chatElement) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = chatElement.querySelector("p");

  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content.trim();
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again.";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);

const linkedinLink = document.getElementById("lin");
let tooltip;

linkedinLink.addEventListener("mouseover", () => {
  // Create a small text element
  const content = "www.linkedin.com/in/prince-k-325121253";
  tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");

  // Create a container for the copy button and text content
  const contentContainer = document.createElement("div");
  contentContainer.style.display = "flex";
  contentContainer.style.flexDirection = "column";
  contentContainer.style.alignItems = "center";

  // Create a copy button
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy";

  let isCopied = false; // Flag to track whether the copy operation is performed

  copyButton.addEventListener("click", () => {
    if (!isCopied) {
      // Copy the content to the clipboard using document.execCommand
      const tempInput = document.createElement("input");
      tempInput.value = content;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Copied to clipboard!");

      isCopied = true;

      // Remove the tooltip after copy with a delay
      setTimeout(() => {
        removeTooltip();
      }, 500); // Adjust the delay time (in milliseconds) based on your preference
    }
  });

  // Append the copy button to the container
  contentContainer.appendChild(copyButton);

  // Create a container for the text content
  const textContainer = document.createElement("div");
  textContainer.textContent = content;

  // Append the text container to the container
  contentContainer.appendChild(textContainer);

  // Append the container to the tooltip
  tooltip.appendChild(contentContainer);

  const linkRect = linkedinLink.getBoundingClientRect();
  tooltip.style.position = "absolute";
  tooltip.style.top = `${linkRect.bottom + 10}px`; // Adjust the values based on your design
  tooltip.style.left = `${linkRect.left - 50}px`;

  // Append the tooltip to the document body
  document.body.appendChild(tooltip);

  // Add mouseleave event listener to the logo and the tooltip
  linkedinLink.addEventListener("mouseleave", handleMouseLeave);
  tooltip.addEventListener("mouseleave", handleMouseLeave);
});

// Remove the tooltip on mouseleave of both linkedinLink and tooltip
const handleMouseLeave = () => {
  // Delay the removal of tooltip to give users time to interact with it
  setTimeout(() => {
    removeTooltip();
  }, 1000); // Adjust the delay time (in milliseconds) based on your preference
};

const removeTooltip = () => {
  if (tooltip && document.body.contains(tooltip)) {
    document.body.removeChild(tooltip);
  }
};

linkedinLink.addEventListener("mouseleave", handleMouseLeave);

const gitLink = document.getElementById("git");
let gitTooltip;

gitLink.addEventListener("mouseover", () => {
  // Create a small text element
  const gitContent = "https://github.com/PrinceKumar7010"; // Replace with your GitHub profile link
  gitTooltip = document.createElement("div");
  gitTooltip.classList.add("tooltip");

  // Create a container for the copy button and text content
  const gitContentContainer = document.createElement("div");
  gitContentContainer.style.display = "flex";
  gitContentContainer.style.flexDirection = "column";
  gitContentContainer.style.alignItems = "center";

  // Create a copy button
  const gitCopyButton = document.createElement("button");
  gitCopyButton.textContent = "Copy";

  let isGitCopied = false; // Flag to track whether the copy operation is performed

  gitCopyButton.addEventListener("click", () => {
    if (!isGitCopied) {
      // Copy the content to the clipboard using document.execCommand
      const tempGitInput = document.createElement("input");
      tempGitInput.value = gitContent;
      document.body.appendChild(tempGitInput);
      tempGitInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempGitInput);
      alert("Copied to clipboard!");

      isGitCopied = true;

      // Remove the tooltip after copy with a delay
      setTimeout(() => {
        removeGitTooltip();
      }, 500); // Adjust the delay time (in milliseconds) based on your preference
    }
  });

  // Append the copy button to the container
  gitContentContainer.appendChild(gitCopyButton);

  // Create a container for the text content
  const gitTextContainer = document.createElement("div");
  gitTextContainer.textContent = gitContent;

  // Append the text container to the container
  gitContentContainer.appendChild(gitTextContainer);

  // Append the container to the tooltip
  gitTooltip.appendChild(gitContentContainer);

  const gitLinkRect = gitLink.getBoundingClientRect();
  gitTooltip.style.position = "absolute";
  gitTooltip.style.top = `${gitLinkRect.bottom + 10}px`; // Adjust the values based on your design
  gitTooltip.style.left = `${gitLinkRect.left - 100}px`;

  // Append the tooltip to the document body
  document.body.appendChild(gitTooltip);

  // Add mouseleave event listener to the logo and the tooltip
  gitLink.addEventListener("mouseleave", handleGitMouseLeave);
  gitTooltip.addEventListener("mouseleave", handleGitMouseLeave);
});

// Remove the tooltip on mouseleave of both gitLink and gitTooltip
const handleGitMouseLeave = () => {
  // Delay the removal of tooltip to give users time to interact with it
  setTimeout(() => {
    removeGitTooltip();
  }, 1000); // Adjust the delay time (in milliseconds) based on your preference
};

const removeGitTooltip = () => {
  if (gitTooltip && document.body.contains(gitTooltip)) {
    document.body.removeChild(gitTooltip);
  }
};

gitLink.addEventListener("mouseleave", handleGitMouseLeave);

const twtLink = document.getElementById("twt");
let twtTooltip;

twtLink.addEventListener("mouseover", () => {
  // Create a small text element
  const twtContent = "https://twitter.com/princekr7010"; // Replace with your Twitter profile link
  twtTooltip = document.createElement("div");
  twtTooltip.classList.add("tooltip");

  // Create a container for the copy button and text content
  const twtContentContainer = document.createElement("div");
  twtContentContainer.style.display = "flex";
  twtContentContainer.style.flexDirection = "column";
  twtContentContainer.style.alignItems = "center";

  // Create a copy button
  const twtCopyButton = document.createElement("button");
  twtCopyButton.textContent = "Copy";

  let isTwtCopied = false; // Flag to track whether the copy operation is performed

  twtCopyButton.addEventListener("click", () => {
    if (!isTwtCopied) {
      // Copy the content to the clipboard using document.execCommand
      const tempTwtInput = document.createElement("input");
      tempTwtInput.value = twtContent;
      document.body.appendChild(tempTwtInput);
      tempTwtInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempTwtInput);
      alert("Copied to clipboard!");

      isTwtCopied = true;

      // Remove the tooltip after copy with a delay
      setTimeout(() => {
        removeTwtTooltip();
      }, 500); // Adjust the delay time (in milliseconds) based on your preference
    }
  });

  // Append the copy button to the container
  twtContentContainer.appendChild(twtCopyButton);

  // Create a container for the text content
  const twtTextContainer = document.createElement("div");
  twtTextContainer.textContent = twtContent;

  // Append the text container to the container
  twtContentContainer.appendChild(twtTextContainer);

  // Append the container to the tooltip
  twtTooltip.appendChild(twtContentContainer);

  const twtLinkRect = twtLink.getBoundingClientRect();
  twtTooltip.style.position = "absolute";
  twtTooltip.style.top = `${twtLinkRect.bottom + 10}px`; // Adjust the values based on your design
  twtTooltip.style.left = `${twtLinkRect.left - 100}px`;

  // Append the tooltip to the document body
  document.body.appendChild(twtTooltip);

  // Add mouseleave event listener to the logo and the tooltip
  twtLink.addEventListener("mouseleave", handleTwtMouseLeave);
  twtTooltip.addEventListener("mouseleave", handleTwtMouseLeave);
});

// Remove the tooltip on mouseleave of both twtLink and twtTooltip
const handleTwtMouseLeave = () => {
  // Delay the removal of tooltip to give users time to interact with it
  setTimeout(() => {
    removeTwtTooltip();
  }, 1000); // Adjust the delay time (in milliseconds) based on your preference
};

const removeTwtTooltip = () => {
  if (twtTooltip && document.body.contains(twtTooltip)) {
    document.body.removeChild(twtTooltip);
  }
};

twtLink.addEventListener("mouseleave", handleTwtMouseLeave);
