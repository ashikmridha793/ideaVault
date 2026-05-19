import { Input, TextArea, Select,  Button, FieldError, Label, TextField, ListBox,  } from "@heroui/react";


const AddIdeaPage = () => {

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

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-6 px-3 sm:p-6">
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 sm:p-8 text-white">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-tight">
                        Add New Idea
                    </h1>
                    <p className="text-sm sm:text-lg opacity-90">
                        Share your innovative concepts and bring them to life.
                    </p>
                </div>
                <form 
                    className="md:p-10 md:space-y-8 md:w-3xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Destination Name */}
                        <div className="md:col-span-2">
                            <TextField name="destinationName" isRequired>
                                <Label>Destination Name</Label>
                                <Input placeholder="Bali Paradise" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Country */}
                        <TextField name="country" isRequired>
                            <Label>Country</Label>
                            <Input placeholder="Indonesia" className="rounded-2xl" />
                            <FieldError />
                        </TextField>

                        {/* Category - Updated Select Component */}
                        <div>
                            <Select

                                name="category"
                                isRequired
                                className="w-full"
                                placeholder="Select category"
                            >
                                <Label>Category</Label>
                                <Select.Trigger className="rounded-2xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Beach" textValue="Beach">
                                            Beach
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Mountain" textValue="Mountain">
                                            Mountain
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="City" textValue="City">
                                            City
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Adventure" textValue="Adventure">
                                            Adventure
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Cultural" textValue="Cultural">
                                            Cultural
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Luxury" textValue="Luxury">
                                            Luxury
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Price */}
                        <TextField name="price" type="number" isRequired>
                            <Label>Price (USD)</Label>
                            <Input
                                type="number"
                                placeholder="1299"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Duration */}
                        <TextField name="duration" isRequired>
                            <Label>Duration</Label>
                            <Input
                                placeholder="7 Days / 6 Nights"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Departure Date */}
                        <div className="md:col-span-2">
                            <TextField name="departureDate" type="date" isRequired>
                                <Label>Departure Date</Label>
                                <Input type="date" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Image URL - Removed preview */}
                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired>
                                <Label>Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/bali-paradise.jpg"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <TextField name="description" isRequired>
                                <Label>Description</Label>
                                <TextArea
                                    placeholder="Describe the travel experience..."
                                    className="rounded-3xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="">
                        <Button
                            type="submit"
                            variant="outline"
                            className=" rounded-none w-full bg-cyan-500 text-white"
                        >Add Destination
                        </Button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddIdeaPage;