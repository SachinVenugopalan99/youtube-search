import React, { FC, memo } from 'react'
import styles from './index.module.css';

interface SeachBoxProps {
onChange: (e: any) => void;
onKeyDown: (e: any) => void;
onFocus: () => void;
}

const SeachBox: FC<SeachBoxProps> = ({onChange, onKeyDown, onFocus}) => {
  return (
    <div>
     <input
        className={styles.inputBox}
        onFocus={onFocus}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default memo(SeachBox);
