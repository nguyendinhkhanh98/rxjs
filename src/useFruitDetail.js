import { useEffect, useState } from 'react';
import { defer } from 'rxjs';
import { getFruit, blockRequestApi } from './api';

// not rxjs
export const useFruitDetail = (fruitName) => {
  const [fruitDetail, setFruitDetail] = useState(null);

  useEffect(() => {
    if (!fruitName) {
      return;
    }

    getFruit(fruitName).then(setFruitDetail);
  }, [fruitName]);

  return fruitDetail;
};

// rxjs cancel api
export const useFruitDetailRxjs = (fruitName, isCancel) => {
  const [fruitDetail, setFruitDetail] = useState(null);
  useEffect(
    () => {
      if (!fruitName) {
        return;
      }

      if(isCancel) {
        const subscription = defer(() => getFruit(fruitName)).subscribe(
          setFruitDetail
        );
  
        return () => {
          subscription.unsubscribe();
        };
      }
      if(!isCancel) {
        getFruit(fruitName).then(setFruitDetail);
      }
    },
    [fruitName]
  );

  return fruitDetail;
};


// block after request when preview request not done
export const blockRequest = () => {
  // blockRequestApi()
}
