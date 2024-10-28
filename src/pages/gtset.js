import { useState } from "react";

export default function GTSet() {
    const [imageSrc, setImageSrc] = useState(null);
    const [equipped, setEquipped] = useState([
        { id: "312", type: "Hat" },
        { id: "8890", type: "Hair" },
        { id: "2870", type: "Face" },
        { id: "1506", type: "Chest" },
        { id: "940", type: "Shirt" },
        { id: "2930", type: "Pants" },
        { id: "5422", type: "Feet" },
        { id: "8024", type: "Back" },
        { id: "2592", type: "Hand" },
        { id: "5080", type: "Artifact" }
    ]);

    const handleInputChange = (index, field, value) => {
        const newEquipped = [...equipped];
        newEquipped[index][field] = value;
        setEquipped(newEquipped);
    };

    const handleButtonClick = async () => {
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    searchQuery: "",
                    selectedType: "Artifact",
                    equipped: equipped.map(item => [item.id, item.type]),
                    expression: 0,
                    skincolor: 0,
                    roleskin: 0,
                    dyes: [255, 255, 255],
                    lenses: [0, 0, 0],
                    drops: [255, 255, 255],
                    riftcape: [[147, 56, 143], [147, 56, 143], true, false, 3],
                    infinitycrown: [[255, 200, 37], [255, 0, 64], [26, 45, 140], false, true, true, true],
                    riftwings: [[93, 22, 200], [220, 72, 255], true, 0],
                    minokawa: [true, true],
                    ahool: [true, true],
                    infinityaura: [[63, 251, 255], [255, 255, 255], [255, 255, 255], false, true, true, true, false, true, true],
                    equinox: 0,
                    celesdragcharm: 0,
                    crownseasons: [0, 0],
                    willofthewild: 0,
                    golgift: 0,
                    perilous: 0,
                    customskincolor: [240, 240, 240, 255],
                    purebeingtrigger: 0,
                    handmovement: 0
                })
            });

            const data = await res.json();
            if (data.setimage) {
                setImageSrc(`data:image/png;base64,${data.setimage}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
            <a>Hello, world!</a>

            {imageSrc && <img src={imageSrc} alt="Generated Set" style={{ marginTop: '20px' }} />}
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {equipped.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '5px', width: '80px' }}>
                            {item.type} ID:
                        </label>
                        <input
                            type="text"
                            value={item.id}
                            placeholder={item.id}
                            onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                            style={{
                                color: '#333',
                                padding: '5px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '100px'
                            }}
                        />
                    </div>
                ))}
            </div>
            <button onClick={handleButtonClick} style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>
                Send Request
            </button>
        </main>
    );
}