"use client"

import { Form, Label, Select, SearchField, ListBox } from "@heroui/react";
import { useState } from "react";


const categories = [
    "Teach",
    "Health",
    "AI",
    "Education",
    "Finance",
    "Business",
    "Environment",
    "Lifestyle",
];

const SearchBox = ({ onFilter }) => {

    const [selectedCategory, setSelectedCategory] = useState('All')

    const handleSubmit = (e) => {
        e.preventDefault()
        

        onFilter(search, category)


    }
    return (
        <Form onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 md:items-end py-6 ">

            <SearchField name="search">
                <Label>Search by title</Label>
                <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input className="50" placeholder="Search title" name="search" />
                    <SearchField.ClearButton />
                </SearchField.Group>
            </SearchField>
            <div>
                <Select
                    selectedKeys={[selectedCategory]}
                    onSelectionChange={key => {
                        setSelectedCategory(Array.from(key)[0])
                    }}
                    placeholder="Select cetegory"
                >
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                        <ListBox >
                            {
                                categories.map((cat) => (
                                    <ListBox.Item
                                        key={cat}
                                        textValue={cat}>
                                        {cat}
                                    </ListBox.Item>
                                ))
                            }
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>
            <button
                type="submit"
                className="bg-slate-500 py-3 px-5 rounded text-white"
            >Filter</button>
        </Form>

    );
};

export default SearchBox;