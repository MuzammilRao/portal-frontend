import React, { useCallback } from 'react';
import styles from '../DynamicItems/DynamicItems.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../services/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import CurrencyFormatter from '../../utils/currencyFormatter';

const UpdateDynamicItem = ({ items, setCreateInvoice, createInvoice, setError }) => {
  const [quantityInputShown, setQuantityInputShown] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [itemsShown, setItemsShown] = useState(items);
  const [itemslist, setItemslist] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [selectedItemID, setSelectedItemID] = useState('');
  const { user } = useAuthContext();

  console.log('createInvoice>>>>', createInvoice);

  const getItems = useCallback(
    async (controller) => {
      //   setIsLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/api/v1/items`, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
          signal: controller.signal,
        });
        if (data) {
          setError(null);
          //   setIsLoading(false);
          setItemslist(data?.data);
        }
      } catch (error) {
        setError(error);
        //console.log(error)
      }
    },
    [user?.data?.token],
  );

  useEffect(() => {
    const controller = new AbortController();
    getItems(controller);

    return () => {
      controller.abort();
    };
  }, [getItems]);

  useEffect(() => {
    const itemsData = items.map((item) => ({
      id: item._id,
      quantity: item.quantity,
      price: item.price,
      description: item.description,
    }));
    setItemData(itemsData);
  }, []);

  useEffect(() => {
    let _item = items?.map((item, i) => {
      return {
        item: item._id,
        title: item.name,
        quantity: itemData[i]?.quantity,
        description: itemData[i]?.description,
        price: itemData[i]?.price,
      };
    });
    setCreateInvoice({ ...createInvoice, items: _item });
  }, [itemsShown, itemData]);
  const handleItemArr = (quantity, price, id, description) => {
    setItemData([
      ...itemData,
      {
        id,
        quantity,
        price,
        description,
      },
    ]);
  };
  const selectItem = (e) => {
    console.log('e>>>>', e.target.value);

    for (let i = 0; i < itemslist.length; i++) {
      console.log('items[i]._id', itemslist[i]._id);
      if (itemslist[i]._id === e.target.value) setSelectedItem(itemslist[i]);
    }
    setQuantityInputShown(true);
    setSelectedItemID(e.target.value);
    // setQuantity(null);
  };
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };
  const handleDeleteItem = (e, index) => {
    const values = [...itemsShown];
    values.splice(index, 1);
    setItemsShown(values);
  };
  const updateItemPriceArr = (e, id, index) => {
    const newArr = itemData.map((item, i) => {
      if (i === index) {
        return { ...item, price: e.target.value };
      } else {
        return item;
      }
    });
    setItemData(newArr);
  };
  const updateItemQuantityArr = (e, id, index) => {
    const newArr = itemData.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: e.target.value };
      } else {
        return item;
      }
    });
    setItemData(newArr);
  };

  const updateItemDescriptionArr = (e, index) => {
    const newArr = itemData.map((item, i) => {
      if (i === index) {
        return { ...item, description: e.target.value };
      } else {
        return item;
      }
    });
    setItemData(newArr);
  };
  const AddItemHandler = () => {
    let _itemsShown = [];

    if (selectedItem?.isCountable) {
      if (selectedItem?.stock > quantity) {
        const newItem = items.find((item) => item._id === selectedItemID);
        let itemWithQuantity = { ...newItem, quantity };

        if (itemsShown.includes(itemWithQuantity)) {
          return;
        }
        _itemsShown.push(...itemsShown, itemWithQuantity);

        setItemsShown(_itemsShown);
        setQuantityInputShown(false);
        handleItemArr(quantity, newItem?.price, newItem._id, newItem?.description);

        setQuantity(0);
      } else {
        setError('Quantity Cannot be Greater than stock');
        setTimeout(() => {
          setError('');
        }, 2000);
        return;
      }
    } else {
      const newItem = items.find((item) => item._id === selectedItemID);
      let itemWithQuantity = { ...newItem, quantity };
      if (itemsShown.includes(itemWithQuantity)) {
        return;
      }
      _itemsShown.push(...itemsShown, itemWithQuantity);
      setItemsShown(_itemsShown);
      setQuantityInputShown(false);
      handleItemArr(quantity, newItem?.price, newItem._id, newItem?.description);
      setQuantity(0);
    }
  };

  return (
    <div>
      Items
      <div className={styles.detailsBox}>
        {itemslist.length > 0 ? (
          <select onChange={(e) => selectItem(e)}>
            <option style={{ display: 'none' }}>Select an Item</option>
            {itemslist &&
              itemslist?.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
        ) : (
          <div>
            no items right now
            <br />
            <Link
              style={{ fontWeight: 'bold', color: '#3e1f97' }}
              to="/dashboard/createpredefineditems"
            >
              Create items now
            </Link>
          </div>
        )}
      </div>
      <div>
        {quantityInputShown && (
          <div className={styles.quantityInputContainer}>
            {selectedItem?.isCountable && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <p>Quantity:</p>
                <input
                  className={styles.quantityInput}
                  type="number"
                  step="1"
                  min="1"
                  max={selectedItem?.stock}
                  value={quantity || ''}
                  onChange={(e) => quantityHandler(e)}
                />
              </div>
            )}
            <button className={styles.createInvoice__addItemButton} onClick={AddItemHandler}>
              Add
            </button>
          </div>
        )}
      </div>
      {itemsShown?.map((item, index) => (
        <div key={index} className={styles.createInvoice__dynamicItem}>
          <div className={styles.createInvoice__dynamicItemHeader}>
            <h5>Item {index + 1}</h5>
            <div className={styles.crossButton} onClick={(e) => handleDeleteItem(e, index)}>
              {index > 0 && 'x'}
            </div>
          </div>
          <div style={{ padding: '5px 15px' }}>
            <div className={styles.nameContainer}>
              <p className={styles.name}>{item?.title}</p>
            </div>
            <div className={styles.nameContainer}>
              <label>
                <span>Price</span>
                <input
                  style={{ padding: '5px', borderRadius: '5px' }}
                  value={itemData[index]?.price}
                  onChange={(e) => {
                    updateItemPriceArr(e, item?._id, index);
                  }}
                />
              </label>
              {item?.quantity ? (
                <label>
                  <span>Quantity</span>
                  <input
                    style={{ padding: '5px', borderRadius: '5px' }}
                    value={itemData[index]?.quantity}
                    // onChange={(e) => {
                    //   setItemQuantity(e.target.value);
                    // }}
                    onChange={(e) => updateItemQuantityArr(e, item?.id, index)}
                  />
                </label>
              ) : null}
            </div>
            <div className={styles.descriptionContainer}>
              <label>
                <span>Description</span>
                <textarea
                  name="itemDescritpion"
                  rows={3}
                  cols={40}
                  value={itemData[index]?.description}
                  onChange={(e) => updateItemDescriptionArr(e, index)}
                />
              </label>
            </div>
            <div className={styles.quantityPriceContainer}>
              {item?.quantity ? (
                <label>
                  <span>Quantity</span>
                  <input
                    style={{ padding: '5px', borderRadius: '5px' }}
                    value={itemData[index].quantity}
                    // onChange={(e) => {
                    //   setItemQuantity(e.target.value);
                    // }}
                    onChange={(e) => updateItemQuantityArr(e, item?.id, index)}
                  />
                </label>
              ) : null}

              {/* <label>
                    <span>Price</span>
                    <input
                      style={{ padding: "5px", borderRadius: "5px" }}
                      value={quantity * itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                    />
                  </label> */}

              <span>Total</span>
              <CurrencyFormatter
                amount={
                  itemData[index]?.quantity
                    ? itemData[index]?.quantity * itemData[index]?.price
                    : itemData[index]?.price
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateDynamicItem;
