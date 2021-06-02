import React, { useEffect, useState } from 'react';

import { useGlobalState } from '../../../state';

import styles from './food-tag.module.css';

export default function FoodTag({ tag }) {
  const [used, setUsed] = useState(false);
  const [formData, setFormData] = useGlobalState('formData');
  const [formEditable] = useGlobalState('formEditable');

  // check if current tag is already in the formdata, then set it to used
  // this is only checked when editing existing an existing dish
  useEffect(() => {
    if (formEditable) {
      for (let i = 0; i < formData['tags'].length; i += 1) {
        if (formData['tags'][i] === tag) {
          setUsed(true);
        }
      }
    }
  }, [formData, formEditable, tag, setUsed]);

  const handleClick = () => {
    // copy the existing tags used in the form
    let newTags = [...formData['tags']];
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
    setFormData({
      ...formData,
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
