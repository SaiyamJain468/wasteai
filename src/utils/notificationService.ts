// Smart Push Notifications Service
export interface NotificationConfig {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
}

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.error('Notifications not supported');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const showNotification = async (config: NotificationConfig) => {
  if (Notification.permission !== 'granted') {
    return;
  }

  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(config.title, {
      body: config.body,
      icon: config.icon || '/icon-192.png',
      badge: config.badge || '/badge-72.png',
      tag: config.tag,
      data: config.data,
      vibrate: [200, 100, 200],
    });
  } else {
    new Notification(config.title, {
      body: config.body,
      icon: config.icon,
    });
  }
};

export const scheduleStreakReminder = (hour: number = 20) => {
  const now = new Date();
  const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0);
  
  if (scheduledTime < now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  const delay = scheduledTime.getTime() - now.getTime();
  
  setTimeout(() => {
    showNotification({
      title: '🔥 Keep Your Streak Alive!',
      body: 'Don\'t forget to scan your waste today and maintain your streak!',
      tag: 'streak-reminder',
    });
  }, delay);
};

export const notifyAchievement = (achievement: string, points: number) => {
  showNotification({
    title: '🏆 Achievement Unlocked!',
    body: `${achievement} - You earned ${points} bonus points!`,
    tag: 'achievement',
  });
};

export const notifyRankChange = (newRank: number, oldRank: number) => {
  if (newRank < oldRank) {
    showNotification({
      title: '📈 You Moved Up!',
      body: `Congratulations! You're now rank #${newRank} in your ward!`,
      tag: 'rank-update',
    });
  }
};

export const notifyPickupDay = (day: string) => {
  showNotification({
    title: '🚛 Garbage Pickup Tomorrow',
    body: `Remember to put out your ${day} waste for collection!`,
    tag: 'pickup-reminder',
  });
};
