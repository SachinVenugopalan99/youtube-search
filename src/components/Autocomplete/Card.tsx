import React, { FC, memo } from 'react'
import styles from './index.module.css';

interface CardProps{
card: any;
index: number;
focusedIndex: number;
handleMouseEnter: (index: number) => void;
}

const Card: FC<CardProps> = ({card, index, focusedIndex, handleMouseEnter}) => {
  return (
    <div
        className={`${styles.item} ${focusedIndex === index ? styles.focused : ''}`}
    onMouseEnter={() => handleMouseEnter(index)}           >
        <h3 dangerouslySetInnerHTML={{__html: card?.id}}>
        </h3>
        <ul>
        {card?.items?.length ? 
        card?.items?.map((sample: any) => <li dangerouslySetInnerHTML={{__html: sample}}/>)
        : null}
        </ul>
        <div dangerouslySetInnerHTML={{__html: card?.name}} />
        <div dangerouslySetInnerHTML={{__html: card?.address}} />
    </div>
  )
}

export default memo(Card);
