import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const base = useId();
  const [open, setOpen] = useState(null);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div className="acc-item" key={item.q}>
            <h3>
              <button
                id={btnId}
                className="acc-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <ChevronDown aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acc-panel" data-open={isOpen}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
