// import React, { useRef } from "react";
// import { Scrollbars } from 'react-custom-scrollbars';

// import "./customScrollBar.scss";

// const CustomScrollbars = ({
//   className,
//   disableVerticalScroll,
//   disableHorizontalScroll,
//   children,
//   ...otherProps
// }) => {
//   const ref = useRef(null);

//   const getScrollLeft = () => {
//     const scrollbars = ref.current;
//     return scrollbars.getScrollLeft();
//   };

//   const getScrollTop = () => {
//     const scrollbars = ref.current;
//     return scrollbars.getScrollTop();
//   };

//   const scrollToBottom = () => {
//     if (!ref.current) {
//       return;
//     }
//     const scrollbars = ref.current;
//     const targetScrollTop = scrollbars.getScrollHeight();
//     scrollTo(targetScrollTop);
//   };

//   const scrollTo = (targetTop) => {
//     const { quickScroll } = otherProps;
//     if (!ref.current) {
//       return;
//     }
//     const scrollbars = ref.current;
//     const originalTop = scrollbars.getScrollTop();
//     let iteration = 0;

//     const scroll = () => {
//       iteration++;
//       if (iteration > 30) {
//         return;
//       }
//       scrollbars.scrollTop(
//         originalTop + ((targetTop - originalTop) / 30) * iteration
//       );

//       if (quickScroll && quickScroll === true) {
//         scroll();
//       } else {
//         setTimeout(() => {
//           scroll();
//         }, 20);
//       }
//     };

//     scroll();
//   };

//   const renderTrackHorizontal = (props) => {
//     return <div {...props} className="track-horizontal" />;
//   };

//   const renderTrackVertical = (props) => {
//     return <div {...props} className="track-vertical" />;
//   };

//   const renderThumbHorizontal = (props) => {
//     return <div {...props} className="thumb-horizontal" />;
//   };

//   const renderThumbVertical = (props) => {
//     return <div {...props} className="thumb-vertical" />;
//   };

//   const renderNone = (props) => {
//     return <div />;
//   };

//   return (
//     <Scrollbars
//       ref={ref}
//       autoHide={true}
//       autoHideTimeout={200}
//       hideTracksWhenNotNeeded={true}
//       className={
//         className ? className + " custom-scrollbar" : "custom-scrollbar"
//       }
//       {...otherProps}
//       renderTrackHorizontal={
//         disableHorizontalScroll ? renderNone : renderTrackHorizontal
//       }
//       renderTrackVertical={
//         disableVerticalScroll ? renderNone : renderTrackVertical
//       }
//       renderThumbHorizontal={
//         disableHorizontalScroll ? renderNone : renderThumbHorizontal
//       }
//       renderThumbVertical={
//         disableVerticalScroll ? renderNone : renderThumbVertical
//       }
//     >
//       {children}
//     </Scrollbars>
//   );
// };

// export default CustomScrollbars;
