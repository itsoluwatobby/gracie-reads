import { useState, useEffect } from 'react'

type TypewriterEffectProps = {
  text: string;
  delay?: number;
  start?: 'BEGIN' | 'END';
  repetition?: 'once' | 'continuous';
}

export default function TypewriterEffect(
  {
    text, delay=0.5, start='END', repetition = 'once',
  }: TypewriterEffectProps
) {
  const [typeWriterText, setTypewriterText] = useState<string>('')
  const [typingPosition, setTypingPosition] = useState<'FORWARDS' | 'BACKWARDS'>('FORWARDS')
 
  useEffect(() => {
    if (!text) return;
    const Timer_Delay = Math.floor(1000 * delay)
    let index = 0
    let timeoutId: NodeJS.Timeout = setInterval(() => {return})
    if(start === 'END') return
    if(typingPosition === 'FORWARDS'){
      timeoutId = setInterval(() => {
        if(index <= text.length){
          setTypewriterText(text.substring(0, index))
          index++
        } else {
            if (repetition === 'once') clearInterval(timeoutId);
            else {
              setTypingPosition('BACKWARDS');
              clearInterval(timeoutId);
            }
          }
        }, Timer_Delay);
      }
    else if(typingPosition === 'BACKWARDS'){
      index = text.length - 1
      timeoutId = setInterval(() => {
        if(index >= 0) {
          setTypewriterText(text?.substring(0, index))
          index--
        }
        else {
          if (repetition === 'once') clearInterval(timeoutId);
          else {
            setTypingPosition('FORWARDS');
            clearInterval(timeoutId);
          }
        }
      }, Timer_Delay);
    }
    else {
      setTypewriterText('');
      index = 0;
      clearInterval(timeoutId);
    }

    return () => clearInterval(timeoutId)
  }, [delay, text, start, typingPosition, repetition])

  return (
    <p className='duration-300 transition-all cursor-default'>
      {typeWriterText}<span className='animate-pulse'>_</span>
    </p>
  )
}