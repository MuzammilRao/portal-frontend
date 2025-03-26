import React, { useEffect, useState, useRef } from 'react';
import styles from './DynamicItems.module.css';
import CurrencyFormatter from '../../utils/currencyFormatter';
import { Link } from 'react-router-dom';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';

const DynamicItems = ({ items, setCreateInvoice, createInvoice, setError }) => {
  const [quantityInputShown, setQuantityInputShown] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedItemID, setSelectedItemID] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [itemsShown, setItemsShown] = useState([]);
  const { allItemData, dispatch } = useInvoiceContext();
  // const [itemPrice, setItemPrice] = useState([]);
  // const [itemQuantity, setItemQuantity] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  console.log('itemData>>>>', itemData);

  // console.log("selectedItem>>>", selectedItem);
  // console.log("selectedItemID>>>", selectedItemID);
  useEffect(() => {
    let _item = itemsShown?.map((item, i) => {
      return {
        item: item._id,
        title: item.name,
        quantity: itemData[i]?.quantity,
        description: itemData[i]?.description,
        price: itemData[i]?.price,
      };
    });
    setCreateInvoice({ ...createInvoice, items: _item });
    // console.log("createInvoice>>>>", createInvoice);
  }, [itemsShown, itemData]);

  const selectItem = (id) => {
    console.log('id', id);
    // console.log("e>>>", e.target.value);
    for (let i = 0; i < items.length; i++) {
      if (items[i]._id === id) setSelectedItem(items[i]);
    }
    setQuantityInputShown(true);
    setSelectedItemID(id);
    setIsOpen(false);
    // console.log("ref.current", ref.current);
    // setQuantity(null);
  };

  const handleDeleteItem = (e, index) => {
    // console.log("index>>>>", index);
    const values = [...itemsShown];
    // console.log("value>>>>", values);
    values.splice(index, 1);
    setItemsShown(values);
  };

  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };
  // const AddItemHandler = () => {

  //     let _itemsShown = [];
  //     const newItem = items.find(item => item._id === selectedItemID);
  //     let itemWithQuantity = { ...newItem, quantity };
  //     if (itemsShown.includes(itemWithQuantity)) {
  //         return
  //     }
  //     _itemsShown.push(...itemsShown, itemWithQuantity)
  //     setItemsShown(_itemsShown);
  //     setQuantityInputShown(false);
  //     setQuantity(null);

  // }

  // const handlingQuantityArr = (value) => {
  //   setItemQuantity([...itemQuantity, value]);
  //   // setItemPrice([...itemPrice, value]);
  // };
  // const handlingPriceArr = (value) => {
  //   // setItemQuantity([...itemQuantity, value]);
  //   setItemPrice([...itemPrice, value]);
  // };
  const handleItemArr = (quantity, price, id, description) => {
    // console.log("quantity>>>>", quantity);
    // console.log("price>>>>", price);
    // console.log("id>>>>", id);
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
  const updateItemPriceArr = (e, id, index) => {
    const newArr = itemData?.map((item, i) => {
      if (i === index) {
        return { ...item, price: e.target.value };
      } else {
        return item;
      }
    });
    setItemData(newArr);
  };
  const updateItemQuantityArr = (e, id, index) => {
    const newArr = itemData?.map((item, i) => {
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
        // console.log("newItem>>>", newItem);
        let itemWithQuantity = { ...newItem, quantity };

        if (itemsShown.includes(itemWithQuantity)) {
          return;
        }
        _itemsShown.push(...itemsShown, itemWithQuantity);

        setItemsShown(_itemsShown);
        setQuantityInputShown(false);
        // setItemPrice(newItem?.price);
        // handlingPriceArr(newItem?.price);
        // handlingQuantityArr(quantity);
        // itemQuantity.push(quantity);

        // setItemQuantity(itemQuantity);
        // setItemPrice()
        handleItemArr(quantity, newItem?.price, newItem._id, newItem?.description);

        setQuantity(0);
        // setSelectedItem("");
      } else {
        setError('Quantity Cannot be Greater than stock');
        setTimeout(() => {
          setError('');
        }, 2000);
        // //console.log('Quantity Cannot be Greater than stock')
        return;
      }
    } else {
      const newItem = items.find((item) => item._id === selectedItemID);
      let itemWithQuantity = { ...newItem, quantity };
      // console.log("quantity>>>", quantity);
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
  useEffect(() => {
    // console.log("its working");
    // console.log("itemData>>>", itemData);
    dispatch({
      type: 'GET_ITEM_DATA',
      payload: itemData,
    });
  }, [itemData]);

  console.log('items>>>', items);
  return (
    <div>
      Items
      <div className={styles.detailsBox}>
        {items.length > 0 ? (
          // <select ref={ref} onChange={(e) => selectItem(e)}>
          //   <option style={{ display: "none" }}>Select an Item</option>
          //   {items &&
          //     items?.map((item, index) => (
          //       <option key={index} value={item._id}>
          //         {item.name}
          //       </option>
          //     ))}
          // </select>
          <>
            <input
              className={styles.dropdownContainer}
              placeholder="Select Items"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <div className={styles.dropdownListContainer}>
                <ul className={styles.dropdownList}>
                  {items &&
                    items
                      .filter((item) => item.name.toLowerCase().includes(query))
                      .map((item) => (
                        <li
                          // ref={ref}
                          onClick={() => selectItem(item._id)}
                          className={styles.dropdownListItem}
                          key={item._id}
                        >
                          {item?.name}
                        </li>
                      ))}
                </ul>
              </div>
            )}
          </>
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
              {' '}
              <p className={styles.name}>{item?.name}</p>{' '}
              {/* <CurrencyFormatter amount={item?.price} />{" "} */}
              {/* <label>
                <span>Price</span>
                <input
                  style={{ padding: "5px", borderRadius: "5px" }}
                  value={itemData[index].price}
                  onChange={(e) => {
                    updateItemPriceArr(e, item?._id, index);
                  }}
                />
              </label> */}
            </div>
            <div className={styles.nameContainer}>
              {/* <p className={styles.name}>{item?.name}</p> */}
              <label>
                <span>Price</span>
                <input
                  style={{ padding: '5px', borderRadius: '5px' }}
                  value={itemData[index].price}
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
                    value={itemData[index].quantity}
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
                  value={itemData[index].description}
                  onChange={(e) => updateItemDescriptionArr(e, index)}
                />
              </label>
              {/* <div>{item?.description}</div> */}
            </div>
            <div className={styles.quantityPriceContainer}>
              {/* {item?.quantity && <p>Quantity: {item?.quantity}</p>} */}
              {/* {console.log("item?.quantity>>>", item?.quantity)} */}
              {/* {item?.quantity ? (
                <label>
                  <span>Quantity</span>
                  <input
                    style={{ padding: "5px", borderRadius: "5px" }}
                    value={itemData[index].quantity}
                    // onChange={(e) => {
                    //   setItemQuantity(e.target.value);
                    // }}
                    onChange={(e) => updateItemQuantityArr(e, item?.id, index)}
                  />
                </label>
              ) : null} */}

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
                  itemData[index].quantity
                    ? itemData[index].quantity * itemData[index].price
                    : itemData[index].price
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(DynamicItems);

{
  /* <div className={styles.detailsBox}>

<label>
    <span>{item?.name}</span>

</label>
<label>
    <span> <CurrencyFormatter amount={item?.price} /></span>

</label>
</div>
<div className={styles.detailsBox}>
<label>
    <span>{item?.description} </span>

</label>
</div>
<div>{item?.quantity}</div> */
}
