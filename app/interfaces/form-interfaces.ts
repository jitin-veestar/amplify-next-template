interface IRegisterFormPayload {
  path: string;
  firstName: string;
  lastName: string;
  senderEmail: string;
  receiverEmail: string;
  message: string;
  subject?: string;
  images: boolean;
  consent: boolean;
}
