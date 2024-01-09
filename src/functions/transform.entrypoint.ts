// -----------------------------------------------------------------------------
// Purpose: Transform entrypoint
// this is the entrypoint that will be called when the transformer is invoked
// to transform an event, the return value of this function will be passed to
// the read model adapter.
// -----------------------------------------------------------------------------
interface Input<T = any> {
  eventId: string;
  validTime: string;
  eventType: string;
  payload: T;
}

export default async function (input: Input) {
  console.info(`Received event ${input.eventId}, with payload ${JSON.stringify(input.payload)} and valid time ${input.validTime}`);
  console.info(`The event type is ${input.eventType} and the tenancy has tenancyid=${input.payload?.tenancyid}`);
  if (input.eventType === "delete") {
    return {
      tenancyid: input.payload.tenancyid
    };
  }
  return {
    eventId: input.eventId,
    validtime: input.validTime,
    ...input.payload,
  };
}
