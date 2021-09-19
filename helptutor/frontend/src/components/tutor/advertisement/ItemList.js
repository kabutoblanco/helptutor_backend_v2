import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { createMessage } from '../../../redux/actions/messages';

import Answer from '../../answer';

import { postAnswer } from '../../../services/Answer';

import { Avatar } from '@material-ui/core';

export default function ItemList(props) {
  const { data } = props;

  const dispatch = useDispatch();

  const [newAnswer, setNewAnswer] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const [answer, setAnswer] = useState({
    advertisement: data.id,
    description: '',
  });

  const createAnswer = (e) => {
    e.preventDefault();
    postAnswer(answer).then(() => {
      setAnswer({ ...answer, description: '' });
      dispatch(createMessage('Respuesta agregada'));
      setNewAnswer(true);
    });
    setNewAnswer(false);
  };

  return (
    <div className='item-offer item-adv d-flex'>
      <div className='offer-view w-100'>
        <Avatar
          alt='user photo'
          className='mr-3'
          src={data.student.user.photo}
          sx={{ width: 65, height: 65 }}>
          <b>{data.student.user.first_name[0]}</b>
        </Avatar>
        <div className='w-100'>
          <div className='offer-information'>
            <span className='offer-title'>{data.title}</span>
            <span className='offer-autor'>{data.student.user.first_name}</span>
            <span className='offer-description'></span>
          </div>
          <div className='input-adv'>
            <form action='' onSubmit={createAnswer}>
              <input
                type='text'
                name='description'
                value={answer.description}
                onChange={(e) => {
                  setAnswer({ ...answer, description: e.target.value });
                }}
              />
              <button type='submit' className='btn btn-primary'>
                {'>'}
              </button>
            </form>
          </div>
          <div className='d-flex'>
            <span
              className={'hover-pointer' + (!showAnswers ? '' : ' hidden')}
              onClick={() => setShowAnswers(!showAnswers)}>
              <i className='fas fa-sort-down mr-1'></i>Ver respuestas
            </span>
          </div>
          <div className='d-flex'>
            <span
              className={'hover-pointer' + (showAnswers ? '' : ' hidden')}
              onClick={() => setShowAnswers(!showAnswers)}>
              <i className='fas fa-sort-up mr-1'></i>Ocultar respuestas
            </span>
          </div>
          {showAnswers ? <Answer id={data.id} refresh={newAnswer} /> : <></>}
        </div>
      </div>
    </div>
  );
}
