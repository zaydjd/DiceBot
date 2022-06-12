module.exports = {
  name: 'ping',
  
  category: 'Test',
  description: 'Replies with pong',
  slash: true,

  callback: ({}) => {
    return 'Pong';
  }
}