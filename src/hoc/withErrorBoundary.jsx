import React from 'react';

export function withErrorBoundary(WrappedComponent) {
    return class extends React.Component {
        state = { hasError: false, error: null };

        static getDerivedStateFromError(error) {
            return { hasError: true, error };
        }

        componentDidCatch(error, errorInfo) {
            console.error('Error caught by boundary:', error, errorInfo);
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div className="error-container">
                        <h2>Đã xảy ra lỗi!</h2>
                        <p>{this.state.error?.message}</p>
                        <button 
                            onClick={() => this.setState({ hasError: false })}
                            className="retry-button"
                        >
                            Thử lại
                        </button>
                    </div>
                );
            }

            return <WrappedComponent {...this.props} />;
        }
    };
}