import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  test("does not change the name", () => {
    const gildedRose = subject("foo", 0, 0);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  test("quality of a normal item goes down by 1", () => {
    const rose = subject("normal", 15, 11);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(10);
  });

  test("quality of a normal item goes down by 2 when it is past it's sell by date", () => {
    const rose = subject("normal", 0, 11);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(9);
  });

  test("quality is zero don't do anything", () => {
    const rose = subject("normal", 5, 0);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  test("Quality of an item is never negative", () => {
    const rose = subject("foo", 0, 0);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  test("decreases the quality value by 1", () => {
    const rose = subject("foo", 5, 10);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(9);
  });

  test("decreases the quality by 2 after the sell_in has reached 0", () => {
    const rose = subject("foo", 0, 10);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  test("Quality of 'Aged Brie' increases by 1 before sell_in reaches 0", () => {
    const rose = subject("Aged Brie", 5, 5);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(6);
  });

  test("Quality of 'Aged Brie' increases by 2 after sell_in reaches 0", () => {
    const rose = subject("Aged Brie", 0, 5);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(7);
  });

  test("Quality never goes above 50", () => {
    const rose = subject("Aged Brie", 0, 50);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  test("'Sulfuras, Hand of Ragnaros', sell_in does not change", () => {
    const rose = subject("Sulfuras, Hand of Ragnaros", 10, 50);
    const items = rose.updateQuality();
    expect(items[0].sellIn).toBe(10);
  });

  test("'Sulfuras, Hand of Ragnaros', quality does not change", () => {
    const rose = subject("Sulfuras, Hand of Ragnaros", 10, 50);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  test("Backstage passes increases in quality by 1 when sell_in is greater than 10", () => {
    const rose = subject("Backstage passes to a TAFKAL80ETC concert", 11, 10);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  test("Backstage passes increases in quality by 2 when sell_in is 10 or less", () => {
    const rose = subject("Backstage passes to a TAFKAL80ETC concert", 10, 10);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  test("Backstage passes increases in quality by 3 when sell_in is 5 or less", () => {
    const rose = subject("Backstage passes to a TAFKAL80ETC concert", 5, 10);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  test("Backstage passes quality drops to 0 when sell_in is 0", () => {
    const rose = subject("Backstage passes to a TAFKAL80ETC concert", 0, 10);
    const items = rose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

function subject(name: string, sellIn: number, quality: number) {
  return new GildedRose([new Item(name, sellIn, quality)]);
}
