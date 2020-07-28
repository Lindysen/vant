// Utils
import { createNamespace } from '../utils';
import { inherit } from '../utils/functional';

// Components
import Cell from '../cell';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../utils/types';
import { Coupon } from '../coupon/shared';

export type CouponCellProps = {
  title?: string;
  border: boolean;
  coupons: Coupon[];
  currency: string;
  editable: boolean;
  chosenCoupon: number | string;
};

const [createComponent, bem, t] = createNamespace('coupon-cell');

function formatValue(props: CouponCellProps, slots: DefaultSlots) {
  const { coupons, chosenCoupon, currency } = props;
  const coupon = coupons[+chosenCoupon];

  if (coupon) {
    const value = coupon.value || coupon.denominations || 0;
    return slots.default
      ? slots.default()
      : `-${currency}${(value / 100).toFixed(2)}`;
  }

  return coupons.length === 0 ? t('tips') : t('count', coupons.length);
}

function CouponCell(
  h: CreateElement,
  props: CouponCellProps,
  slots: DefaultSlots,
  ctx: RenderContext<CouponCellProps>
) {
  const valueClass = props.coupons[+props.chosenCoupon]
    ? 'van-coupon-cell--selected'
    : '';
  const value = formatValue(props, slots);

  return (
    <Cell
      class={bem()}
      title={props.title || t('title')}
      border={props.border}
      isLink={props.editable}
      valueClass={valueClass}
      {...inherit(ctx, true)}
    >
      <span>{value}</span>
    </Cell>
  );
}

CouponCell.model = {
  prop: 'chosenCoupon',
};

CouponCell.props = {
  title: String,
  coupons: {
    type: Array,
    default: () => [],
  },
  currency: {
    type: String,
    default: '¥',
  },
  border: {
    type: Boolean,
    default: true,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  chosenCoupon: {
    type: [Number, String],
    default: -1,
  },
};

export default createComponent<CouponCellProps, {}, DefaultSlots>(CouponCell);
