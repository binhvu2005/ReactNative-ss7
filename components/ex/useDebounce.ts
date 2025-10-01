import { useState, useEffect } from "react";

/**
 * Custom hook useDebounce
 * 
 * @param value - Giá trị cần debounce (ví dụ: text từ ô tìm kiếm)
 * @param delay - Thời gian chờ (milliseconds, ví dụ: 500ms)
 * @returns Giá trị debounced - chỉ được cập nhật sau khi value không thay đổi trong khoảng thời gian delay
 * 
 * @example
 * const [searchQuery, setSearchQuery] = useState("");
 * const debouncedSearchQuery = useDebounce(searchQuery, 500);
 * 
 * useEffect(() => {
 *   // Gọi API tìm kiếm với debouncedSearchQuery
 *   performSearch(debouncedSearchQuery);
 * }, [debouncedSearchQuery]);
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Tạo timer để cập nhật debouncedValue sau delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function để xóa timer khi value thay đổi hoặc component unmount
    // Điều này đảm bảo:
    // 1. Không có memory leak
    // 2. Timer cũ được hủy khi value thay đổi
    // 3. Component được unmount thì timer cũng được dọn dẹp
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Chỉ chạy lại khi value hoặc delay thay đổi

  return debouncedValue;
}

export default useDebounce;
