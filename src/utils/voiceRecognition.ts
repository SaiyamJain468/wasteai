// Voice-Activated Scanning Feature
let recognition: any = null;
let synthesis: any = null;

export const initVoiceRecognition = () => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  }
  
  if ('speechSynthesis' in window) {
    synthesis = window.speechSynthesis;
  }
};

export const startVoiceCommand = (onCommand: (command: string) => void) => {
  if (!recognition) {
    console.error('Speech recognition not supported');
    return;
  }

  recognition.start();

  recognition.onresult = (event: any) => {
    const command = event.results[0][0].transcript.toLowerCase();
    onCommand(command);
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
  };
};

export const stopVoiceCommand = () => {
  if (recognition) {
    recognition.stop();
  }
};

export const speak = (text: string) => {
  if (!synthesis) {
    console.error('Speech synthesis not supported');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  synthesis.speak(utterance);
};

export const parseVoiceCommand = (command: string): string | null => {
  const scanKeywords = ['scan', 'classify', 'identify', 'check'];
  const helpKeywords = ['help', 'guide', 'how'];
  
  if (scanKeywords.some(keyword => command.includes(keyword))) {
    return 'SCAN';
  }
  
  if (helpKeywords.some(keyword => command.includes(keyword))) {
    return 'HELP';
  }
  
  return null;
};
