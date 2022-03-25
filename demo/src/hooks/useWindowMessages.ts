import { useEffect } from 'react'
import { action } from 'ts-action'
import { MessageBroker, IChannelContract, actionSchema, filter } from '../services/window-messages'

enum InboundMessage {
  LoadContent = 'load content',
  Save = 'save'
}

enum OutboundMessage {
  ContentChanged = 'content changed',
  SaveAcknowledge = 'save request acknowledged',
  SaveSuccess = 'save successful',
  SaveFail = 'save failed'
}

interface LoadContentAction {
  type: string;
  content: string;
}

const contract: IChannelContract = {
  accepted: [
    actionSchema(InboundMessage.LoadContent, {
      properties: { content: { type: 'string' } },
      required: ['content']
    }),
    actionSchema(InboundMessage.Save)
  ],
  emitted: [
    actionSchema(OutboundMessage.ContentChanged),
    actionSchema(OutboundMessage.SaveAcknowledge),
    actionSchema(OutboundMessage.SaveSuccess),
    actionSchema(OutboundMessage.SaveFail)
  ]
}

const contentChanged = action(OutboundMessage.ContentChanged);
const saveAcknowledged = action(OutboundMessage.SaveAcknowledge);
const saveSuccessful = action(OutboundMessage.SaveSuccess);
const saveFailed = action(OutboundMessage.SaveFail);

const useWindowMessages = (onLoadContent: (content: string) => void, onSave: () => void) => {
  useEffect(() => {
    if (!(window as any).windowMessageBroker) {
      (window as any).windowMessageBroker = new MessageBroker('cool-editor', contract)
      let broker = (window as any).windowMessageBroker as MessageBroker;
      broker
        .addChannel('email-flows-webapp', window.parent)
        .onMessage(filter<LoadContentAction>(InboundMessage.LoadContent, ({ content }) => onLoadContent(content)))
        .onMessage(filter(InboundMessage.Save, (_, channel) => (onSave(), channel.sendMessage(saveAcknowledged()))))
        .connect()
    }
  }, []);
};

export default useWindowMessages;