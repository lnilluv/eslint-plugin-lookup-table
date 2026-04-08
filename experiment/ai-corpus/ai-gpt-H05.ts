export type NotificationType = "message" | "mention" | "system" | "alert" | "reminder";

export interface FormattedNotification {
  titlePrefix: string;
  formattedBody: string;
  priority: "low" | "medium" | "high" | "critical";
  soundFileName: string;
}

export function formatNotification(type: NotificationType, body: string): FormattedNotification {
  switch (type) {
    case "message":
      return {
        titlePrefix: "💬 New Message",
        formattedBody: body,
        priority: "low",
        soundFileName: "message.mp3",
      };
    case "mention":
      return {
        titlePrefix: "📢 You were mentioned",
        formattedBody: body,
        priority: "medium",
        soundFileName: "mention.mp3",
      };
    case "system":
      return {
        titlePrefix: "⚙️ System Notice",
        formattedBody: body,
        priority: "low",
        soundFileName: "system.mp3",
      };
    case "alert":
      return {
        titlePrefix: "🚨 Alert",
        formattedBody: body.toUpperCase(),
        priority: "critical",
        soundFileName: "alert.mp3",
      };
    case "reminder":
      return {
        titlePrefix: "⏰ Reminder",
        formattedBody: body,
        priority: "high",
        soundFileName: "reminder.mp3",
      };
  }
}
