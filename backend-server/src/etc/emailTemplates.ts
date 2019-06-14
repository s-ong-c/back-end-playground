
export const createAuthEmail = (registered: boolean, code: string) => {
    const emailKeywords = registered
      ? {
          type: 'email-login',
          text: '로그인'
        }
      : {
          type: 'register',
          text: '회원가입'
        };
    const subject = `SONGC ${emailKeywords.text}`;
    const body = `
    <a href="https://songc.io"><img src="https://i.imgur.com/PMaYPoN.png" style="display: block; width: 500px; margin: 0 auto;"/></a>
    <div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #35495e; margin-top: 0.5rem; box-sizing: border-box;">
      <b style="black">오늘도 안녕하세요!!  </b>${emailKeywords.text} 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
    </div>
    
    <a href="https://songc.io/${emailKeywords.type}?code=${code}" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #42b883; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">SONGC 계속하기</a>
    
    <div style="text-align: center; margin-top: 1rem; color: #5ea2f7; font-size: 0.85rem;"><div>위 버튼을 클릭하시거나, 다음 링크를 열으세요: <br/> <a style="color: #b197fc;" href="https://songc.io/${emailKeywords.type}?code=${code}">https://songc.io/${emailKeywords.type}?code=${code}</a></div><br/><div>이 링크는 24시간동안 유효합니다. </div></div> `;

    return {
        subject, 
        body
    };
};