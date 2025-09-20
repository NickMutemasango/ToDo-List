export const formatTodoDate = (date: Date): string => {
  const now = new Date();
  const todoDate = new Date(date);
  
  // Check if it's today
  const isToday = todoDate.toDateString() === now.toDateString();
  
  // Check if it's yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = todoDate.toDateString() === yesterday.toDateString();
  
  // Format time
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const timeString = timeFormatter.format(todoDate);
  
  if (isToday) {
    return `Added today at ${timeString}`;
  } else if (isYesterday) {
    return `Added yesterday at ${timeString}`;
  } else {
    // For older dates, show the full date
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return `Added ${dateFormatter.format(todoDate)} at ${timeString}`;
  }
};