// * ADD NEW CHAT
exports.createChat = (name) => {
  return name;
};

// * CHAT DISPLAY
exports.sendMessage = (name, timeStamp, message) => {
  return `${name} ${message} ${timeStamp}`;
}