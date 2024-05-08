import React, {useState, useRef, useEffect, FC, useCallback, useMemo, memo} from 'react'
import styles from  './index.module.css';
import Card from './Card';

interface AutocompleteProps {
  options: any[];
}

const Autocomplete:FC<AutocompleteProps> = ({options=[]}) => {

  // useStates
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [cursorHovering, setCursorHovering] = useState(false);

  // useRefs
  const autocompleteRef = useRef<any>(false);
  const listRef = useRef<any>(null);

  // useEffects
  useEffect(() => {
    // Reset focused index when search term changes
    setFocusedIndex(-1);
  }, [value]);

    useEffect(() => {
    const handleClick = (event: any) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    // Scroll focused item into view when list changes
    if (focusedIndex !== -1 && listRef.current) {
      const focusedItem = listRef.current.children[focusedIndex];
      if (focusedItem) {
        focusedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [focusedIndex]);

  const highlightSearchTerm = useCallback((item: any) => {
   return item?.replace(new RegExp(value, 'gi'),(match : any) =>
        `<mark style="color: #f30505; background: none;">${match}</mark>`
    )}, [value]);

  const filteredData = useMemo(() => {
    return options.filter((option: any) =>
      option?.id?.includes(value) || option?.name?.includes(value) || option?.address?.includes(value) || option?.pincode?.includes(value) || option?.items?.filter((item: any) => item?.includes(value))?.length
    )?.map(item => {
        let newId = highlightSearchTerm(item.id)
        let newName = highlightSearchTerm(item.name)
        let newAddress = highlightSearchTerm(item.address)
        let newPincode = highlightSearchTerm(item.pincod)
        let newItems = value ? item?.items?.filter((item: any) => item?.includes(value))?.map((val: any) => highlightSearchTerm(val)) : [];
        return {
          id: newId,
          name: newName,
          address: newAddress,
          pincode: newPincode,
          items: newItems
        }
      })
  }, [value, options, highlightSearchTerm]);

  const handleKeyDown = useCallback((e: any) => {
    if (e.key === 'ArrowUp') {
      // Move focus to the previous item
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setCursorHovering(false); // Disable cursor hovering when navigating with arrow keys
    } else if (e.key === 'ArrowDown') {
      // Move focus to the next item
      setFocusedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredData.length - 1)
      );
      setCursorHovering(false); // Disable cursor hovering when navigating with arrow keys
    }
  }, [filteredData]);

  const handleMouseEnter = useCallback((index: number) => {
    setFocusedIndex(index);
    setCursorHovering(true); // Enable cursor hovering when the mouse enters the list
  }, []);

  const handleChange = useCallback((event: any) => {
    setValue(event.target.value);
  }, []);

  return (
    <div className={styles.autoSuggestion} ref={autocompleteRef}>
      <div>
        <input
          className={styles.inputBox}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {showSuggestions && (
        <div className={`${styles.suggestions} ${!cursorHovering ? styles.cursorHover : ''}`} ref={listRef} style={{cursor: !cursorHovering ? 'none': 'pointer'}}>
          {filteredData?.length ? filteredData?.map((item, index) => (
            <Card key={item?.id} card={item} index={index} focusedIndex={focusedIndex} handleMouseEnter={handleMouseEnter} />
          )): <div className={styles.noData}>No User Found.</div>}
        </div>
      )}
    </div>
  )
}

export default memo(Autocomplete)
