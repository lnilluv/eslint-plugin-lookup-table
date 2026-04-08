export type NotificationType = "message" | "mention" | "system" | "alert" | "reminder";
export type NotificationPriority = "low" | "normal" | "high" | "critical";

export interface FormattedNotification {
  titlePrefix: string;
  formattedBody: string;
  priority: NotificationPriority;
  soundFileName: string;
}

interface NotificationTemplate {
  titlePrefix: string;
  priority: NotificationPriority;
  soundFileName: string;
}

const TEMPLATES: Record<NotificationType, NotificationTemplate> = {
  message: {
    titlePrefix: "New message",
    priority: "normal",
    soundFileName: "message.wav",
  },
  mention: {
    titlePrefix: "You were mentioned",
    priority: "high",
    soundFileName: "mention.wav",
  },
  system: {
    titlePrefix: "System update",
    priority: "low",
    soundFileName: "system.wav",
  },
  alert: {
    titlePrefix: "Alert",
    priority: "critical",
    soundFileName: "alert.wav",
  },
  reminder: {
    titlePrefix: "Reminder",
    priority: "normal",
    soundFileName: "reminder.wav",
  },
};

export function formatNotification(type: NotificationType, body: string): FormattedNotification {
  const template = TEMPLATES[type];
  const cleanedBody = body.trim().replace(/\s+/g, " ");

  return {
    titlePrefix: template.titlePrefix,
    formattedBody: cleanedBody,
    priority: template.priority,
    soundFileName: template.soundFileName,
  };
}
