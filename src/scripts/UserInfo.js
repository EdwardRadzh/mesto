export class UserInfo {
    constructor( { userNameSelector, userDescriptionSelector, userAvatarSelector } ) {
        this._userNameEl = document.querySelector(userNameSelector);
        this._userDescriptionEl = document.querySelector(userDescriptionSelector);
        this._avatar = document.querySelector(userAvatarSelector);
    };
        
    getUserInfo() {
        return {
            userName: this._userNameEl.textContent,
            userDescription: this._userDescriptionEl.textContent
        };
    };
    
    setUserInfo( { name, about, avatar}) {
        this._userNameEl.textContent = name;
        this._userDescriptionEl.textContent = about;
        this._avatar.src = avatar;
    };

    handleUserAvatar(data) {
        this._avatar.src = data.avatar;
    }

};