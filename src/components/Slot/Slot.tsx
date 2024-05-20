// import React from 'react';
// interface SlotProps extends React.HTMLAttributes<HTMLElement> {
//   children?: React.ReactNode;
// }

// function isSlottable(child: React.ReactNode): child is React.ReactElement {
//     return React.isValidElement(child) && child.type === Slottable;
//   }

// const Slottable = ({ children }: { children: React.ReactNode }) => {
//     return <>{children}</>;
//   };

// const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
//   const { children, ...slotProps } = props;
//   const childrenArray = React.Children.toArray(children);
//   const slottable = childrenArray.find(isSlottable);

//   return <div>Slot</div>;
// });

// export default Slot;
