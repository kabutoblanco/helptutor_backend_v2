import React from 'react';

import { useDispatch } from 'react-redux';

import { loginGoogle } from '../../redux/actions/auth';

import GoogleLogin from 'react-google-login';

export default function AuthGoogle(props) {
  const { isLogin } = props;

  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    const data = {
      token: response.tokenId,
    };
    if (isLogin) dispatch(loginGoogle(data));
    // else {
    //   props.addUserGoogle(data);
    // }
  };

  return (
    <>
      <GoogleLogin
        clientId='581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com'
        buttonText={isLogin ? 'Google' : 'Google'}
        onSuccess={(res) => responseGoogle(res)}
        onFailure={(res) => responseGoogle(res)}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}
