export enum MessageTypes {
  API_MESSAGE = 'apiMessage',
  USER_MESSAGE = 'userMessage',
}

export type Message = {
  type: MessageTypes;
  message: string;
};
