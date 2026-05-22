"use client";

import { Form, Label, SearchField, Select, ListBox } from "@heroui/react";
import { useState } from "react";

const categories = ["All", "Tech", "Health", "AI", "Education", "Finance", "Business", "Environment", "Lifestyle"];

const SearchBox = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(search, category, startDate, endDate);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-4 lg:items-end py-6 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700"
    >
      <SearchField name="search" className="flex-1">
        <Label>Search by title</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search startup ideas..."
          />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      <div className="w-full lg:w-48">
        <Label className="mb-1 block">Category</Label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2.5 bg-transparent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label className="mb-1 block">From</Label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-transparent"
        />
      </div>

      <div>
        <Label className="mb-1 block">To</Label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 bg-transparent"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-lg font-medium"
      >
        Filter
      </button>
    </Form>
  );
};

export default SearchBox;
