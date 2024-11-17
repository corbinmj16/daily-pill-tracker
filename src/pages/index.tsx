import {useState} from "react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
    DialogFooter,
    DialogTrigger
} from '@/components/ui/dialog';

const current = new Date();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getNumberOfDaysInCurrentMonth(): Date[] {
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const d = new Date(year, month, 0);
    const days = Array.from({ length: d.getDate() }, (v, i) => new Date(year, month, i + 1));

    return days;
}

import { Medicine } from "@/types";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

export default function Home() {
    // const medicines: Medicine[] = [
    //     {
    //         name: 'B12',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Thyrostim',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'DIM',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Black Seed Oil',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'SAM-e',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Pectasol',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Vitamin D',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Zinc',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Magnesium',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Perfect Amino Protein',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Progesterone',
    //         description: 'I need this for something specific'
    //     },
    //     {
    //         name: 'Trazodone',
    //         description: 'I need this for something specific'
    //     },
    // ];
    const [newMedicineName, setNewMedicineName] = useState<string>('');
    const [newMedicineDescription, setNewMedicineDescription] = useState<string>('');
    const [newMedicineTime, setNewMedicineTime] = useState<string>('');

    function handleAddMedicine() {
        const newMed: Medicine = {
            name: newMedicineName,
            description: newMedicineDescription,
            time: newMedicineTime
        };

        localStorage.setItem('medicines', JSON.stringify(newMed));
    }

    return (
        <div>
            <h1 className="text-2xl">{months[current.getMonth()]} {current.getDate()}, {current.getFullYear()}</h1>
            <h2 className="text-sm">{weekdays[current.getDay()]}</h2>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add Medicine</Button>
                </DialogTrigger>

                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <DialogTitle>Add Medicine</DialogTitle>
                        <DialogDescription>This will be added to your list of daily medicines/vitamins.</DialogDescription>
                    </DialogHeader>

                    <div className='space-y-5'>
                        <div>
                            <Label htmlFor="medicine_name" className='font-bold'>Medicine Name</Label>
                            <Input
                                name="medicine_name"
                                id="medicine_name"
                                type='text'
                                placeholder='Vitamin B12'
                                onChange={(e) => setNewMedicineName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="medicine_description" className='font-bold'>Medicine Description</Label>
                            <Input
                                name="medicine_description"
                                id="medicine_description"
                                type='text'
                                placeholder='Vitamin B12 Description'
                                onChange={(e) => setNewMedicineDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label className='font-bold'>When do you take this?</Label>
                            <RadioGroup defaultValue="compact" onValueChange={(value) => setNewMedicineTime(value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="morning" id="morning" />
                                    <Label htmlFor="morning">Morning</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="afternoon" id="afternoon"/>
                                    <Label htmlFor="afternoon">Afternoon</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="night" id="night"/>
                                    <Label htmlFor="night">Night</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={handleAddMedicine}>Submit</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>

        </div>
    );
}
