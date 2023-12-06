"use client";
import React from "react";
import SellingCard from "@/components/SellingCard/SellingCard";
import { Posts } from "../../components/dummyData";

const test = () => {
	return (
		<div>
			{Posts.map((p) => (
				<SellingCard key={p.id} post={p} />
			))}
		</div>
	);
};

export default test;
