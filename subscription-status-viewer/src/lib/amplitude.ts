import * as amplitude from "@amplitude/analytics-browser";

// Initialize with your Amplitude API key
amplitude.init("YOUR_AMPLITUDE_API_KEY");

export const logEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  amplitude.track(eventName, eventProperties);
};
