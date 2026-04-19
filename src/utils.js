function refreshAllAdminTables() {
    ['cars', 'ads', 'sales', 'bookings', 'users'].forEach(type => {
        syncAdminTables(type);
    });
    updateAdminStats();
}

function updateAdminStats() {
    const cCount = document.getElementById('stat-cars-count-v2');
    const bCount = document.getElementById('stat-bookings-count-v2');
    const valueStat = document.getElementById('stat-total-value-v2');

    // Safety check if IDs exist
    if (!cCount) return;

    if (cCount) cCount.innerText = state.cars.length;

    if (bCount) {
        // Correctly calculate bookings count based on role
        const isAdmin = state.userProfile?.role === 'admin';
        const isSupervisor = state.userProfile?.role === 'supervisor';
        const currentUid = state.user?.uid;
        const myBookings = (isAdmin || isSupervisor) ? state.bookings : state.bookings.filter(b => b.assignedTo === currentUid);
        bCount.innerText = myBookings.length;
    }

    if (valueStat && (state.userProfile?.role === 'admin' || state.userProfile?.role === 'supervisor')) {
        const total = state.cars.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);
        valueStat.innerText = total.toLocaleString() + ' ريال';
    }
}
