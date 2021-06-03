import React, { useEffect, useState } from 'react';

import { useGlobalState } from '../../../state';

import styles from './food-tag.module.css';

export default function FoodTag({ tag }) {
  const [used, setUsed] = useState(false);
  const [addFoodFormData, setAddFoodFormData] =
    useGlobalState('addFoodFormData');
  const [addFoodFormEditable] = useGlobalState('addFoodFormEditable');

  // check if current tag is already in the formdata, then set it to used
  // this is only checked when editing existing an existing dish
  useEffect(() => {
    if (addFoodFormEditable) {
      for (let i = 0; i < addFoodFormData['tags'].length; i += 1) {
        if (addFoodFormData['tags'][i] === tag) {
          setUsed(true);
        }
      }
    }
  }, [addFoodFormData, addFoodFormEditable, tag, setUsed]);

  const handleClick = () => {
    // copy the existing tags used in the form
    let newTags = [...addFoodFormData['tags']];
    if (used) {
      // if the current tag is used, remove it from the form's tags
      newTags = newTags.filter((oldTag) => oldTag !== tag);
      setUsed(false);
    } else {
      // otherwise, add it to the form's tags
      newTags.push(tag);
      setUsed(true);
    }

    // update the form data with new tags array
    setAddFoodFormData({
      ...addFoodFormData,
      tags: newTags,
    });
  };

  return (
    <span
      className={`${styles.foodTag} ${used && styles.used}`}
      onClick={handleClick}>
      {tag}
    </span>
  );
}
