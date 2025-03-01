import useUserStore from '@/hooks/useUser';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { formatRial } from './utils/formatters';
import { getSystemGoldPrice } from './utils/goldSystem';

const priceOfGold = getSystemGoldPrice();

const Buy = () => {
    const {
        balance,
        subtractBalance,
        addGold,
        formatBalance,
        formatGold
    } = useUserStore();

    const [goldAmount, setGoldAmount] = useState('');
    const [rialAmount, setRialAmount] = useState('');
    const [tab, setTab] = useState<'gold' | 'rial'>('gold');
    const [error, setError] = useState('');

    const handleBuy = () => {
        setError('');
        if (tab === 'gold') {
            const totalCost = priceOfGold * +goldAmount;
            if (balance.lessThan(totalCost)) {
                setError('موجودی کافی نیست');
                return;
            }
            subtractBalance(totalCost);
            addGold(goldAmount);
        } else {
            const goldToBuy = +rialAmount / priceOfGold;
            if (balance.lessThan(rialAmount)) {
                setError('موجودی کافی نیست');
                return;
            }
            subtractBalance(rialAmount);
            addGold(goldToBuy);
        }
    };

    return (
        <div className='mx-auto my-10 max-w-2xl gap-4 flex flex-col'>
            <div className='flex flex-col gap-4 border-2 border-gray-300 rounded-md p-4'>
                <p>قیمت طلا: {formatRial(priceOfGold)}</p>
                <p>موجودی: {formatBalance()}</p>
                <p>طلا: {formatGold()}</p>
            </div>

            <div className='flex gap-4'>
                <Button onClick={() => setTab('gold')} variant={tab === 'gold' ? 'default' : 'outline'}>خرید طلا</Button>
                <Button onClick={() => setTab('rial')} variant={tab === 'rial' ? 'default' : 'outline'}>خرید با ریال</Button>
            </div>

            {tab === 'gold' && (
                <Input placeholder='گرم' type="number" value={goldAmount} onChange={(e) => setGoldAmount(e.target.value)} />
            )}
            {tab === 'rial' && (
                <Input placeholder='ریال' type="number" value={rialAmount} onChange={(e) => setRialAmount(e.target.value)} />
            )}

            {error && <p className='text-red-500'>{error}</p>}

            <Button onClick={handleBuy}>خرید</Button>
        </div>
    );
}

export default Buy;