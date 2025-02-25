export class MockWebSocket implements WebSocket {
  private handlers: { [key: string]: Function } = {}
  readyState: number = WebSocket.CONNECTING
  bufferedAmount: number = 0
  url: string = ''
  binaryType: BinaryType = 'blob'
  extensions: string = ''
  protocol: string = ''
  
  // 必须实现的 WebSocket 属性
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null = null
  onerror: ((this: WebSocket, ev: Event) => any) | null = null
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null = null
  onopen: ((this: WebSocket, ev: Event) => any) | null = null

  constructor(url: string) {
    this.url = url
    setTimeout(() => {
      this.readyState = WebSocket.OPEN
      if (this.onopen) {
        this.onopen(new Event('open'))
      }
    }, 100)
  }

  send(data: string) {
    const message = JSON.parse(data)
    
    if (message.type === 'ping') {
      this.mockResponse({
        type: 'pong',
        data: null
      })
      return
    }

    // 模拟AI回复
    setTimeout(() => {
      const responses = [
        'I understand what you mean.',
        'That\'s an interesting point.',
        'Let me think about that for a moment.',
        'Here\'s what I think about that...',
        'Could you elaborate on that?'
      ]
      
      this.mockResponse({
        type: 'chat',
        data: {
          type: 'chat',
          content: responses[Math.floor(Math.random() * responses.length)] + 
                  ' ' + this.generateRandomSentence(),
          timestamp: Date.now()
        }
      })
    }, 1000)
  }

  private mockResponse(data: any) {
    if (this.onmessage) {
      const event = new MessageEvent('message', {
        data: JSON.stringify(data)
      })
      this.onmessage(event)
    }
  }

  private generateRandomSentence() {
    const sentences = [
      'This is a fascinating topic.',
      'Let me explain in more detail.',
      'There are several aspects to consider.',
      'Based on my analysis, I think...',
      'Here\'s what the research shows.'
    ]
    return sentences[Math.floor(Math.random() * sentences.length)]
  }

  addEventListener(type: string, listener: EventListener): void {
    switch (type) {
      case 'open':
        this.onopen = listener as (ev: Event) => any
        break
      case 'message':
        this.onmessage = listener as (ev: MessageEvent) => any
        break
      case 'close':
        this.onclose = listener as (ev: CloseEvent) => any
        break
      case 'error':
        this.onerror = listener as (ev: Event) => any
        break
    }
  }

  removeEventListener(type: string, listener: EventListener): void {
    switch (type) {
      case 'open':
        if (this.onopen === listener) this.onopen = null
        break
      case 'message':
        if (this.onmessage === listener) this.onmessage = null
        break
      case 'close':
        if (this.onclose === listener) this.onclose = null
        break
      case 'error':
        if (this.onerror === listener) this.onerror = null
        break
    }
  }

  dispatchEvent(event: Event): boolean {
    return true
  }

  close(code?: number, reason?: string): void {
    this.readyState = WebSocket.CLOSED
    if (this.onclose) {
      this.onclose(new CloseEvent('close', { code, reason }))
    }
  }

  CONNECTING = WebSocket.CONNECTING;
  OPEN = WebSocket.OPEN;
  CLOSING = WebSocket.CLOSING;
  CLOSED = WebSocket.CLOSED;
} 