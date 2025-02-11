"use client";
import { Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { incrementTwice } from "@/store/actions";

export default function Home() {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counter.value);
  const handleClick = () => {
    dispatch(incrementTwice());
  };
  return (
    <div>
      <Typography>{counterValue}</Typography>
      <button onClick={handleClick}>increment</button>
    </div>
  );
}
