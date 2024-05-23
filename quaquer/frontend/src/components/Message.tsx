import React from 'react';

import style from './Message.module.css';

interface IQuack {
    key: string,
    content: string,
    author: string
}

const Quack: React.FC<{quack:IQuack}> = ({quack}) => {

    return (
        <div className={style.message}>
            <p>{quack.content}</p>
            <p className={style.author}><em>{quack.author}</em></p>
        </div>
    )
}

const Messages: React.FC<{data:IQuack[]}> = ({data}) => (
    <>
    
    <div className={style.messages}>
        {data.map((quack)=>(<Quack key={quack.key} quack={quack}/>))}
    </div>
    </>

);

export default Messages;