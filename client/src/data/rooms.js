export const rooms = [
  {
    id: 'deluxe-sea-view',
    name: 'Deluxe Sea View',
    price: 115,
    capacity: 2,
    size: 32,
    bed: 'King bed',
    picture: 'room',
    short: 'Wake up to the sound of the waves with a private balcony facing the ocean.',
    description:
      'Our most popular room. Large windows, a private balcony with ocean view, a king size bed and a rain shower. Breakfast on the terrace is included.',
    amenities: ['Ocean view', 'Private balcony', 'Breakfast included', 'Air conditioning', 'Free Wi-Fi', 'Rain shower'],
  },
  {
    id: 'garden-suite',
    name: 'Garden Suite',
    price: 130,
    capacity: 3,
    size: 45,
    bed: 'King bed + sofa bed',
    picture: 'garden',
    short: 'A quiet suite surrounded by tropical plants, with its own small terrace.',
    description:
      'Perfect for families or longer stays. A separate living area, a sofa bed and a private terrace opening onto the garden.',
    amenities: ['Garden terrace', 'Living area', 'Breakfast included', 'Air conditioning', 'Free Wi-Fi', 'Mini fridge'],
  },
  {
    id: 'standard-double',
    name: 'Standard Double',
    price: 85,
    capacity: 2,
    size: 24,
    bed: 'Queen bed',
    picture: 'room',
    short: 'Simple and comfortable, everything you need for a relaxing stay.',
    description:
      'A bright double room with a queen bed, a work desk and a modern bathroom. A good choice for short stays and business trips.',
    amenities: ['Queen bed', 'Work desk', 'Air conditioning', 'Free Wi-Fi', 'Hot shower'],
  },
  {
    id: 'ocean-family-room',
    name: 'Ocean Family Room',
    price: 160,
    capacity: 4,
    size: 52,
    bed: '2 queen beds',
    picture: 'sea',
    short: 'Two queen beds and a large balcony, ideal for families and small groups.',
    description:
      'Our largest room, with two queen beds, a dining corner and a wide balcony facing the bay. Kids under 6 stay for free.',
    amenities: ['Ocean view', 'Large balcony', 'Breakfast included', 'Air conditioning', 'Free Wi-Fi', 'Dining corner'],
  },
]

export function getRoom(id) {
  return rooms.find((room) => room.id === id)
}
