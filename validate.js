export const validateNickName = (nickName) => {
    const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/
    return regex.test(nickName)
}

export const validateEmail = (email) => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email)
}

export const validatePw = (Pw) => {
    const regex = /^.{4,}$/
    return regex.test(Pw)
}


//  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ 최소8자,최소 한 개의 숫자, 최소 한 개의 영문자

//  /^.{8,}$/   최소 8자

// /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/  2~16자, 한글 초성 및 모음은 허용 x

//dd