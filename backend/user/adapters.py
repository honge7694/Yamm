from allauth.account.adapter  import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data

        # 기본 저장 필드 : first_name, last_name, user_name, email
        user = super().save_user(request, user, form, False)

        # 추가 저장 필드 : name, nickname, phonenumber, taste, profile_img
        username = data.get("username")
        nickname = data.get('nickname')
        phonenumber = data.get('phonenumber')
        taste = data.get('taste')
        profile_img = data.get('profile_img')

        # if username and nickname and phonenumber:
        if nickname and phonenumber:
            user.username = username
            user.nickname = nickname
            user.phonenumber = phonenumber

        # if taste or profile_img:
            user.taste = taste
            user.profile_img = profile_img
        
        user.save()
        
        return user

