class Helper {
  public reduceTextLength(content: string, maxLength=20, option:('letter'|'word')='letter') {
    let responseOutput = '';
    if(option === 'letter'){
      responseOutput = content?.length > maxLength ? content?.substring(0, maxLength) +'...' : content
    }
    else if(option === 'word'){
      responseOutput = content?.split(' ')?.length > maxLength ? content?.substring(0, maxLength * 4) +'...' : content
    }
    return responseOutput
  }

  public getFirstLetter(name = 'N') {
    return name[0].toUpperCase();
  }

  public getCurrentDate() {
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'full'
    }).format(new Date());
  }
  
  public getFullName(user: { [x:string]: string | null, firstName: string, lastName: string }) {
    return user.firstName + ' ' + user.lastName
  }

  public formatTime(date: string, includeTime = false) {
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'long',
      timeStyle: includeTime ? 'long' : undefined,
    }).format(new Date(date));
  }

  jsonParseValue = <T>(value: string): T => {
    try {
      return JSON.parse(value) as T;
    } catch(err) {
      void(err);
      return value as T;
    }
  }

  getToken() {
    return window.localStorage.getItem('blaze_estate') as string;
  }
}
export const helper = new Helper();
