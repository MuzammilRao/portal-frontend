export const FileHandler = (e) => {
  const file = e.target.files[0];

  if (!file) {
    alert('Please select a File to upload!');
    return;
  }
  console.log(1, file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    return reader.result ? reader.result : '';
  };
};

export const yearsList = () => {
  const yearsArray = [];
  for (let year = 2024; year >= 2004; year--) {
    yearsArray.push(year);
  }
  return yearsArray;
};

export function getMonthName(monthNumber) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Check if the monthNumber is within a valid range
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    // Handle invalid monthNumber
    return 'Invalid Month';
  }
}

export function findCommonElements(array1, array2) {
  return array1.filter((element) => array2.includes(element));
}

// export const renderCheckboxes = (items, selectedItems, handleCheckboxChange) => {
//   return (
//     <div style={{ marginTop: '5px' }}>
//       {items &&
//         items.length > 0 &&
//         items.map((item, i) => (
//           <div key={i} style={{ display: 'flex', gap: '15px' }}>
//             <input
//               type="checkbox"
//               style={{ border: '1px solid black' }}
//               onChange={() => handleCheckboxChange(item._id)}
//               checked={selectedItems.includes(item._id)}
//             />
//             <span style={{color:"#000"}}>{item?.name}</span>
//           </div>
//         ))}
//     </div>
//   );
// };
export const renderCheckboxes = (items, selectedItems, handleCheckboxChange) => (
  <div style={{ marginTop: '5px' }}>
    {items?.map((item) => (
      <div key={item._id} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <input
          type="checkbox"
          style={{
            border: '1px solid #000', // Solid black border
            backgroundColor: selectedItems.includes(item._id) ? '#FF6347' : '#FFF', // Change background when checked
            width: '16px', // Adjust size if needed
            height: '16px',
            cursor: 'pointer', // Add pointer cursor for better UX
          }}
          onChange={() => handleCheckboxChange(item._id)}
          checked={selectedItems.includes(item._id)}
        />
        <span
          style={{
            color: selectedItems.includes(item._id) ? '#FF6347' : '#000', // Change color when checked
            // fontWeight: selectedItems.includes(item._id) ? 'bold' : 'normal',
            textTransform: 'capitalize',
          }}
        >
          {item.name}
        </span>
      </div>
    ))}
  </div>
);

export const generateGetQuery = (baseUrl, filters) => {
  const queryParams = Object.keys(filters)
    .map((key) => {
      const value = filters[key];
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      return `${
        ['page', 'limit', 'sort', 'fields', 'search'].includes(key) ? key : `filters[${encodedKey}]`
      }=${encodedValue}`;
    })
    .join('&');

  if (!queryParams) {
    return baseUrl;
  } else {
    return `${baseUrl}?${queryParams}`;
  }
};

// export const addCaseWithLoading = (
//   builder,
//   asyncAction,
//   { onCompleted, onPending, onReject } = {},
// ) => {
//   builder.addCase(asyncAction.pending, (state, action) => {
//     state?.isLoading != undefined ? (state.isLoading = true) : null;
//     onPending && onPending(state, action);
//   });
//   builder.addCase(asyncAction.fulfilled, (state, action) => {
//     onCompleted && onCompleted(state, action);
//     state?.isLoading != undefined ? (state.isLoading = false) : null;
//   });
//   builder.addCase(asyncAction.rejected, (state, action) => {
//     onReject && onReject(state, action);
//     state?.isLoading != undefined ? (state.isLoading = false) : null;
//   });
// };

export const addCaseWithLoading = (
  builder,
  asyncAction,
  { onCompleted, onPending, onReject } = {},
) => {
  builder.addCase(asyncAction.pending, (state, action) => {
    if (state && state.isLoading !== undefined) {
      state.isLoading = true;
    }
    if (onPending) {
      onPending(state, action);
    }
  });
  builder.addCase(asyncAction.fulfilled, (state, action) => {
    if (onCompleted) {
      onCompleted(state, action);
    }
    if (state && state.isLoading !== undefined) {
      state.isLoading = false;
    }
  });
  builder.addCase(asyncAction.rejected, (state, action) => {
    if (onReject) {
      onReject(state, action);
    }
    if (state && state.isLoading !== undefined) {
      state.isLoading = false;
    }
  });
};
